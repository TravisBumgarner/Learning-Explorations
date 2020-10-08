#include <Wire.h>
 
#define I2C_ADDRESS_OTHER 0x2
#define I2C_ADDRESS_ME 0x1
 
void setup() {
 Serial.begin(9600);
 Wire.begin(I2C_ADDRESS_ME);
 Wire.onReceive(receiveI2C);
}
 
void loop() {
 delay(5000);
 Wire.beginTransmission(I2C_ADDRESS_LCD);
 Wire.write("hello world from 0x1 to 0x2");
 Wire.endTransmission();
}
 
void receiveI2C(int howMany) {
 while (Wire.available() > 0) {
  char c = Wire.read();
  Serial.print(c);
 }
 Serial.println();
}
