shopt -s extglob
rm -rf ../cakery2/cakery-webapp/src/main/resources/static/!(login.html)

mkdir dist/admin
mv dist/indexAdmin.html dist/admin/indexAdmin.html
mv dist/** ../cakery2/cakery-webapp/src/main/resources/static/
