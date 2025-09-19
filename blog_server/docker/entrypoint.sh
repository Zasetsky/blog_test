#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

# ждём БД
echo "Waiting DB..."
php -r '
$host=getenv("DB_HOST")?: "db";
$port=getenv("DB_PORT")?: "3306";
for ($i=0;$i<60;$i++){ $c=@fsockopen($host,$port); if($c){fclose($c); exit(0);} sleep(1);} exit(1);
'

# миграции + сиды
php artisan migrate:fresh --seed --force

# запустим php-fpm в форграунде
exec php-fpm
