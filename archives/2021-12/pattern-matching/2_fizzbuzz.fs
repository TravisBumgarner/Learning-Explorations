let fizzy num =     
   match num % 3, num % 5 with      
      | 0,0 -> "fizzbuzz"
      | 0,_ -> "fizz"
      | _,0 -> "buzz"
      | _,_ -> num.ToString()