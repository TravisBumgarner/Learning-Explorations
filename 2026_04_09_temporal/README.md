# Notes

- **Activities** normal function/method that executes a single well-defined action (either short or long running) - sending emails, writing to a database, etc.
    - Each activity could be things like writeToDatabase() and sendEmail(). They should be separate because if they were together and the email send fails, the writeToDatabase would be called two times.
- **Workflows** orchestrate activities and contain the application logic.
    - Workflows are resilient. They can run and keep running for years, even if the underlying infra fails. 
    - If app fails Temporal can automatically recreate it's pre-failure state so it can continue where it left off.
