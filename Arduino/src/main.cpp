#include <Arduino.h>
#include <HTTPClient.h>
#include "constants.h"
#include "esp32const.h"
#include <string>
#define debug()       \
	Serial.begin(9600); \
	delay(2000);        \
	blinkTestSetup();

// #include <ArduinoJson.hpp>

// The interface from the backend is:
// [
// 	{
// 		id: number,
// 		activeNow: boolean,
// 	}
// ]

/**
 * Basic struct for define the disk boot data (id and bool that is true if active and false otherwise)
 */
struct Disk
{
	int diskId; //CamelCase in c++?
	bool boot;
};
const int disco1 = 25;
const int disco2 = 33;
const int pinReset = 32;
const int extraPin = 35;

const String strApiUrl = STR_API_URL;
const String pcID = PC_ID;

// 25 y 32
void blinkTestSetup()
{
	pinMode(LED_PIN, OUTPUT);
	pinMode(disco1, OUTPUT);
	pinMode(disco2, OUTPUT);
	digitalWrite(disco1, LOW);
	while (true)
	{
		Serial.println("Pines HIGH");
		digitalWrite(disco1, HIGH);
		digitalWrite(disco2, HIGH);
		delay(2000);
		Serial.println("Pines LOW");
		digitalWrite(disco1, LOW);
		digitalWrite(disco2, LOW);
		delay(2000);
	}
}
void shouldConnectDisk(struct Disk disk, int diskPin)
{
	if (disk.boot == true)
	{
		digitalWrite(diskPin, HIGH);
	}
	else
	{
		digitalWrite(diskPin, LOW);
	}
}

void setup()
{

	Serial.begin(9600);
	Serial.println("Setup");
	Serial.println(strApiUrl);
	// delay(2000);
	// pinMode(LED_PIN, OUTPUT);
	pinMode(disco1, OUTPUT);
	pinMode(disco2, OUTPUT);
	pinMode(pinReset, OUTPUT);
	pinMode(extraPin, OUTPUT);

	// blinkTestSetup();
	const char *ssid = SSID;
	const char *password = PASSWORD;
	Serial.println("Setup");
	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED)
		;
	// delete ssid;
	// delete password;
	Serial.println("Wifi connected");
}
bool isBooted = false;
void loop()
{
	if (!isBooted)
	{
		HTTPClient http;
		String urlToAsk = strApiUrl + "arduino/" + pcID;
		Serial.println(urlToAsk);
		http.begin(urlToAsk); //Specify the URL
		// http.begin(strApiUrl + "/arduino/v2/" + pcID); //Second version using ArduinoJson
		http.GET();
		// Payload actualy is type 0110f
		// xyf  x is the disk number, y is only 1 for true (Have to power the disk) or 0 (Not to power the disk), f is for indicate the finish of the string
		String payloadStr = http.getString();
		Serial.println(payloadStr);
		std::vector<Disk> payload = {};
		for (int i = 0; payloadStr.charAt(i) != 'f'; i += 2)
		{
			Serial.println("Iterator vale " + (i - '0'));
			char charAtI = payloadStr.charAt(i);

			struct Disk diskI;
			diskI.diskId = (charAtI - '0');
			Serial.println("Char at I+1: " + payloadStr.charAt(i + 1));
			Serial.println(payloadStr.charAt(i + 1));
			diskI.boot = (payloadStr.charAt(i + 1) == '1');

			Serial.println("Boot el disco" + diskI.boot);
			payload.push_back(diskI);
		}
		for (auto disk : payload)
		{
			switch (disk.diskId)
			{
			case 0:
				shouldConnectDisk(disk, disco1);
				break;
			case 1:
				shouldConnectDisk(disk, disco2);
				break;
			case 2:
				shouldConnectDisk(disk, extraPin);
				break;
			}
		}

		digitalWrite(pinReset, HIGH);
		delay(500);
		digitalWrite(pinReset, LOW);
		digitalWrite(extraPin, HIGH);
		isBooted = true;
	}
	else
	{
		delay(10000);
	}
}
