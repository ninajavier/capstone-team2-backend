COPY stations (station_id, complex_id, gtfs_stop_id, division, line, stop_name, borough, daytime_routes, structure, gtfs_latitude, gtfs_longitude, north_direction_label, south_direction_label, ada, ada_direction_notes, ada_nb, ada_sb)
FROM '/Users/laurawilliams/module-6/capstone/prograde-backend/NYC_SUBWAY_STATIONS_10:1.csv'
DELIMITER ',' CSV HEADER;
