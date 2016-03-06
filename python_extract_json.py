#!/usr/bin/python3

import geojson

# Read object from file
fin = open('export.geojson','rb')
fout = open('out.csv','w')
obj_data = fin.read()
fin.close()

# Decode Geojson object
obj = geojson.loads(obj_data.decode("utf-8"))
# Extract features
features = obj["features"]
# Build CSV
count = 0
for feature in features:
    if 'name' in feature['properties'] and 'place' in feature['properties']:
        fout.write(feature['properties']['@id'] + ',\"' + feature['properties']['place'] + '\",\"' + feature['properties']['name'] + '\", \n')
        count = count + 1
print('out.csv populated with \'' + str(count) + '\' entries')
fout.close()
