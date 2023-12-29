import os, sys

if __name__=="__main__":
    
    if len(sys.argv) < 2:
        print("Please provide a path.")
        sys.exit(0)

    lines = []
    files = sys.argv[1:]

    for file in files:
        with open(file, 'r', encoding="utf-8") as f:
            title = file.split("\\")[-1].replace('.md', '').replace('-', ' ').title()
            lines.append(f"## { title }")
            lines.extend(f.readlines())
            lines.append("---")
    
    lines = [ f"{ "- " if line != "---" and not line.startswith("##") else "" }{ line.replace("\n", "") }" for line in lines if line != "\n" ]

    with open("README.md", 'w', encoding="utf-8") as f:
        f.write("\n".join(lines))