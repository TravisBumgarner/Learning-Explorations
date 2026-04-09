# Notes

- **Activities** normal function/method that executes a single well-defined action (either short or long running) - sending emails, writing to a database, etc.
    - Each activity could be things like writeToDatabase() and sendEmail(). They should be separate because if they were together and the email send fails, the writeToDatabase would be called two times.
- **Workflows** orchestrate activities and contain the application logic.
    - Workflows are resilient. They can run and keep running for years, even if the underlying infra fails. 
    - If app fails Temporal can automatically recreate it's pre-failure state so it can continue where it left off.

❯ If I had a insertToDB and sendEmail that I wanted to both run and if one failed 
   not retry the other, how would I do that                                       

⏺ Depends on whether you want them to run in parallel or sequentially.

  Sequential — just await them in order. If insertToDB fails, sendEmail never     
  starts:
  await insertToDB();                                                             
  await sendEmail(); 
                    
  Parallel — use Promise.all. If either fails, the workflow throws and neither is
  retried:                                                                        
  await Promise.all([insertToDB(), sendEmail()]);
                                                                                  
  In both cases, set maximumAttempts: 1 on the proxyActivities config so a failing
   activity doesn't retry itself before the workflow gets a chance to react.      
   
  One caveat with parallel: if insertToDB fails while sendEmail is mid-execution, 
  sendEmail runs to completion — Temporal can't abort an already-running activity.
   The workflow won't retry it, but it won't be cancelled mid-flight either. If   
  that's a problem, you'd need cancellation scopes, which is a more advanced
  topic.

❯ What if I did seuqnetial and had like                                           
                                                                                  
  const id = await insertToDB():                                                  
  await sendEmail(id)                                                             
                                                                                  
⏺ That works perfectly — it's actually the idiomatic Temporal pattern. The id     
  returned from insertToDB gets persisted in the workflow's event history, so if
  the workflow needs to replay, sendEmail will always be called with the correct  
  id without re-running insertToDB.