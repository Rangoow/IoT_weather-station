#include <ESP8266WiFi.h>// Include the NodeMCU ESP8266 Library.
#include "DHT.h"  // Include the DHT Sensor Library.

#define DHTTYPE DHT11 // Defines the type of DHT sensor used.
#define LEDonBoard 2  // Defining an On Board LED, used for indicators when the process of connecting to a wifi router.


String apiKey = "C864EPUIEOKZRO8I"; // Enter your Write API key from ThingSpeak.


const char* ssid = "Noue"; // SSID of your WiFi router.
const char* password = "adlanegrosdegun"; // Passwrd of your WiFi router.
const char* server = "api.thingspeak.com"; // ThingSpeak Server
const int DHTPin = D2; // The pin used for the DHT11 sensor is Pin D2


DHT dht(DHTPin, DHTTYPE); // Initialize DHT sensor : dht(Pin_used, Type_of_DHT_Sensor);

WiFiClient client;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(500);
  dht.begin();  // Start reading DHT11 sensors datas
  delay(500);
  
  WiFi.begin(ssid, password); // Connect to your WiFi router
  Serial.println("");
    
  pinMode(LEDonBoard,OUTPUT); // On Board LED port Direction output
  digitalWrite(LEDonBoard, HIGH); // Turn off Led On Board
  
  
  Serial.print("Connecting"); // Waiting for nodeMCU to connect on wifi
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    digitalWrite(LEDonBoard, LOW);
    delay(250);
    digitalWrite(LEDonBoard, HIGH);
    delay(250); // while wifi isn't connected make the LED flash each second
  }
  digitalWrite(LEDonBoard, HIGH); // When connected turn of the light
  Serial.println("");
  Serial.print("Successfully connected to : ");
  Serial.println(ssid);
}

void loop() {
  // put your main code here, to run repeatedly:
  float h = dht.readHumidity(); // h catch the humitidy value
  float t = dht.readTemperature(); // t take the temperature value
      
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!"); // in case the value is equal to NaN display an error message
    return;
  }

  if (client.connect(server,80))  {
    String postStr = apiKey;
    postStr +="&field1=";
    postStr += String(t);
    postStr +="&field2=";
    postStr += String(h);
    postStr += "\r\n\r\n";
 
    client.print("POST /update HTTP/1.1\n");
    client.print("Host: api.thingspeak.com\n");
    client.print("Connection: close\n");
    client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
    client.print("Content-Type: application/x-www-form-urlencoded\n");
    client.print("Content-Length: ");
    client.print(postStr.length());
    client.print("\n\n");
    client.print(postStr);
 
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.print(" °C || Humidity: ");
    Serial.print(h);
    Serial.println("%.")
    Serial.println("Datas has been sent to Thingspeak server.");
  }
  client.stop();
  Serial.println("Waiting...");// waiting for next data set
  // Even if data are printed in serial monitor each second, ThingSpeak needs 15 sec between each updates
  

  digitalWrite(LEDonBoard, LOW);
  delay(250);
  digitalWrite(LEDonBoard, HIGH);
  delay(750);// Make the board LED falshing to show the programm is running.
}
