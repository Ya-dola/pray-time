#!/bin/bash

# Function to calculate the indentation based on the parent directories list
calculate_indentation() {
    local num_parents=${#parent_dirs[@]}
    for ((i=0; i<num_parents; i++)); do
        echo -n "|  "
    done
}

# Initialize variables
current_path=""
declare -a parent_dirs

# Use find command to generate the directory structure
while IFS= read -r line; do
    # Exclude .git directory and its children
    if [[ "$line" == */.git* ]]; then
        continue
    fi

    # Extract the path components into an array
    IFS='/' read -ra path_components <<< "$line"

    # Compare the path with the current path
    if [[ "$line" == "$current_path"* ]]; then
        # Path is within the current path, update the parent directories list
        parent_dirs=("${path_components[@]#${current_path}/}")
    else
        # Path is outside the current path, update the current path and parent directories list
        current_path="$line"
        parent_dirs=("${path_components[@]}")
    fi

    # Check if the current path matches any patterns in .gitignore
    if git check-ignore -q "$line"; then
        continue
    fi

    # Calculate indentation based on parent directories list
    indentation=$(calculate_indentation)
    # Print the directory with proper indentation
    echo "${indentation}--${path_components[-1]}"
    # Print files within the directory with additional indentation
    find "$line" -maxdepth 1 -type f -exec echo "${indentation}  |--{}" \;
done < <(find . -type d -print) > directory_tree.txt
