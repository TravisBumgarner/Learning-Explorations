
const unsigned int MAX_MESSAGE_LENGTH = 12;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  Serial.print("Waiting");
}

void loop() {
  Serial.print(".");
  delay(500);
//  while (Serial.available() > 0)
//  {
//    static char message[MAX_MESSAGE_LENGTH];
//    static unsigned int message_pos = 0;
//
//    char inByte = Serial.read();
//
//    if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) ) {
//      message[message_pos] = inByte;
//      message_pos++;
//    } else {
//      if (String(message) == "ping") {
//        Serial.println("pong");
//      } else if (String(message) == "on"){
//        Serial.println("LED on");
//        digitalWrite(13, HIGH);
//      } else if (String(message) == "off"){
//        Serial.println("LED off");
//        digitalWrite(13, LOW);
//      } else {
//        Serial.println(message);
//      }
//      memset(message, 0, sizeof(message));
//      message_pos = 0;
//    }
//  }
}