int LED_ID = 13;

void setup() {
  pinMode(LED_ID, OUTPUT);

}

void loop() {
  delay(1000);
  digitalWrite(LED_ID, HIGH);
  delay(1000);
  digitalWrite(LED_ID, LOW);
}