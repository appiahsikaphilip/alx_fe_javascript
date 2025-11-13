cd ~/alx_fe_javascript/dom-manipulation

echo "=== FINAL VERIFICATION REPORT ===" > verification_report.txt
echo "" >> verification_report.txt

echo "1. FILE EXISTENCE:" >> verification_report.txt
ls -lh index.html script.js >> verification_report.txt 2>&1
echo "" >> verification_report.txt

echo "2. POPULATE CATEGORIES FUNCTION:" >> verification_report.txt
grep -n "function populateCategories" script.js >> verification_report.txt
echo "" >> verification_report.txt

echo "3. FILTER QUOTES FUNCTION:" >> verification_report.txt
grep -n "function filterQuotes" script.js >> verification_report.txt
echo "" >> verification_report.txt

echo "4. SAVE CATEGORY FUNCTION:" >> verification_report.txt
grep -n "function saveSelectedCategory" script.js >> verification_report.txt
echo "" >> verification_report.txt

echo "5. LOAD CATEGORY FUNCTION:" >> verification_report.txt
grep -n "function loadSelectedCategory" script.js >> verification_report.txt
echo "" >> verification_report.txt

echo "6. CATEGORY FILTER IN HTML:" >> verification_report.txt
grep -n "categoryFilter" index.html >> verification_report.txt
echo "" >> verification_report.txt

cat verification_report.txt
