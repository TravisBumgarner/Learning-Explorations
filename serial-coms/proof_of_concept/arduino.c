const unsigned int MAX_MESSAGE_LENGTH = 12;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  while (Serial.available() > 0)
  {
    static char message[MAX_MESSAGE_LENGTH];
    static unsigned int message_pos = 0;

    char inByte = Serial.read();

    if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) ) {
      message[message_pos] = inByte;
      message_pos++;
    } else {
      String messageStr = String(message);
      messageStr.trim();
      if (messageStr == "ping") {
        Serial.print("pong");
      } else if (String(message) == "on"){
        Serial.print("LED on");
        digitalWrite(13, HIGH);
      } else if (String(message) == "off"){
        Serial.print("LED off");
        digitalWrite(13, LOW);
      }
      memset(message, 0, sizeof(message));
      message_pos = 0;
    }
  }
}