#!/bin/bash

# Variables for database configuration
DB_NAME="asm2_prj"
DB_USER="asm2_prj"
DB_PASSWORD="1234567"
OUTPUT_FILE="asm2_prj_backup.sql"

# Run mysqldump command
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME >$OUTPUT_FILE

# Check if the export was successful
if [ $? -eq 0 ]; then
    echo "Database export successful: $OUTPUT_FILE"
else
    echo "Database export failed"
fi
