#include <Wire.h>

/* Swap the next numbers for the next two lines depending on the device you're on */
#define I2C_ADDRESS_OTHER 0x2
#define I2C_ADDRESS_ME 0x1
 
void setup() {
 Serial.begin(9600);
 Wire.begin(I2C_ADDRESS_ME);
 Wire.onReceive(receiveI2C);
}
 
void loop() {
 Wire.beginTransmission(I2C_ADDRESS_OTHER);
 if(Serial.available() > 0) {
    char incomingMessage = Serial.read();
    Wire.write(incomingMessage);
    Wire.endTransmission();
  }

}
 
void receiveI2C(int howMany) {
 while (Wire.available() > 0) {
  char c = Wire.read();
  Serial.print(c);
 }
}
