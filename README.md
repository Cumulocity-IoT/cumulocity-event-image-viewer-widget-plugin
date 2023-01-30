
# Event Image Viewer Widget for Cumulocity [<img width="35" src="https://user-images.githubusercontent.com/32765455/211497905-561e9197-18b9-43d5-a023-071d3635f4eb.png"/>](https://github.com/SoftwareAG/cumulocity-event-image-viewer-widget-plugin/releases/download/1.0.0-beta/event-image-viewer-runtime-widget-1.0.0-beta.zip)

This Event Image Viewer Widget is the Cumulocity module federation plugin created using c8ycli. This plugin can be used in Application Builder or Cockpit.
The Event Image Viewer widget help you to to display the events that are created whenever the image is captured by the camera.

### Please note that this plugin is in currently under BETA mode.

### Please choose Event Image Viewer release based on Cumulocity/Application builder version:

| APPLICATION BUILDER | CUMULOCITY  | EVENT IMAGE VIEWER WIDGET |
|---------------------|-------------|---------------------------|
| 2.x.x(coming soon)  | >= 1016.x.x | 1.x.x                     | 


![s3_image_viewer_widget](https://user-images.githubusercontent.com/70568133/102998337-fe3a5980-454c-11eb-8fee-51ad96c5c927.PNG)



## Prerequisite
   Cumulocity c8ycli >=1016.x.x
   
## Features

 *  **Displays the events.**
 *  **Displays the captured images.** 
 *  **Uses AI Predictive analytics for image classification** 
 
## Installation


### Runtime Widget Deployment?

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-event-image-viewer-widget-plugin/releases/download/1.0.0-beta/event-image-viewer-runtime-widget-1.0.0-beta.zip) and install via Administrations(Beta mode) --> Ecosystems --> Applications --> Packages.


**Instructions**

1. Clone the repository:
```
git clone https://github.com/SoftwareAG/cumulocity-event-image-viewer-widget-plugin.git
```
2. Change directory:

cd cumulocity-demo-widget-plugin
```cumulocity-event-image-viewer-widget-plugin

3. Install the dependencies: 
```
npm install
```
4. (Optional) Local development server: 
```
npm start -- --shell cockpit
```
5. Build the app: 
```
npm run build
```
6. Deploy the app: 
```
npm run deploy


## QuickStart
This guide will teach you how to add widget in your existing or new dashboard.

1. Open the Application Builder from the app switcher (Next to your username in the top right)

2. Click Add application

3. Enter the application details and click Save

4. Select Add dashboard

5. Click Blank Dashboard

6. Enter the dashboard details and click Save

7. Select the dashboard from the navigation

8. Check for your widget and test it out.

Congratulations! Event Image Viewer Widget is configured.


## User Guide

1. Target Assets/Devices - select group of interest
![s3_image_viewer_config1](https://user-images.githubusercontent.com/70568133/102999005-473edd80-454e-11eb-9a09-9bb6aac913a4.PNG)
![s3_image_viewer_config2](https://user-images.githubusercontent.com/70568133/102999029-50c84580-454e-11eb-8787-236fcc998985.PNG)


------------------------------

This Widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECH Community Forums](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).
