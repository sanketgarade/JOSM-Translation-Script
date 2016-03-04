# JOSM Translation Script
A simple script for performing translation of place names in JOSM.

Installation:

1. Download "translate.js" and "dict.csv" and place them in the same path and you are done.

2. You can create your own "dict.csv" using any spreadsheet app and saving the result as a CSV file. Ensure that the first column corresponds to the "name" field and second colomn corresponds to the translated string in the "name:xx" field. Please note that it is important to have the data in the first column sorted in the ascending order.

3. Modify "name:xx" fields in the script to correspond to the target language.

Usage instructions:

1. Generate a list of places for translation from OSM using overpass turbo (http://overpass-turbo.eu/). The script that can acheive this is available in the file "overpass_script.txt".

2. Download the raw data generated using "export->raw data" as "export.osm"

3. Import "export.osm" in JOSM.

4. Install the plugin "scripting" from "JOSM:Edit->Preferences->Plug-in"

5. Run the script using "JOSM:Scripting->Run"

6. Upload changes to OSM server
