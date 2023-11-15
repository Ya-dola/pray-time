# WORKING VERSION
find . -type d \( -path "./.git" -o -path "./.git/*" \) -prune -o -type f -print | grep -v -E "$(grep -v '^#' .gitignore | grep -v '^$' | sed 's/\(.*\)/\\\1/' | paste -sd '|' -)" > files_and_directories.txt

