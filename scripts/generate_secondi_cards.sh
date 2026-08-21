#!/usr/bin/env bash
set -euo pipefail

output_dir="images/secondi/cards"
font="/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
mkdir -p "$output_dir"

make_card() {
    local source="$1"
    local output="$2"
    local title="$3"
    local point_size="$4"
    local work_dir
    work_dir=$(mktemp -d)

    convert "$source" -resize '850x^' -gravity South -crop 850x650+0+0 +repage "$work_dir/photo.png"
    convert "$work_dir/photo.png" -blur 0x24 -modulate 104,82,100 "$work_dir/blur.png"

    convert -size 260x650 gradient:black-white -size 590x650 xc:white +append "$work_dir/blur-mask.png"
    convert "$work_dir/blur.png" "$work_dir/blur-mask.png" -alpha off -compose CopyOpacity -composite "$work_dir/blur-layer.png"

    convert -size 150x650 gradient:black-white -size 700x650 xc:white +append "$work_dir/sharp-mask.png"
    convert "$work_dir/photo.png" "$work_dir/sharp-mask.png" -alpha off -compose CopyOpacity -composite "$work_dir/sharp-layer.png"

    convert -size 1400x650 xc:'#fffaf3' \
        "$work_dir/blur-layer.png" -geometry +550+0 -compose over -composite \
        "$work_dir/sharp-layer.png" -geometry +550+0 -compose over -composite \
        -fill '#123c31' -font "$font" -pointsize "$point_size" -gravity west \
        -annotate +64+0 "$title" \
        -fill '#b5762a' -stroke '#b5762a' -strokewidth 2 -draw 'line 65,430 155,430' \
        -stroke none -draw 'polygon 171,430 177,424 183,430 177,436' \
        -quality 86 "$output"

    rm -rf "$work_dir"
}

make_card "images/secondi/carne-tonnata.webp" "$output_dir/carne-tonnata.webp" $'CARNE\nTONNATA' 68
make_card "images/secondi/cotoletta-alla-milanese.webp" "$output_dir/cotoletta-alla-milanese.webp" $'COTOLETTA ALLA\nMILANESE' 46
make_card "images/secondi/hamburger-manzo-griglia.webp" "$output_dir/hamburger-manzo-griglia.webp" $'HAMBURGER DI MANZO\nALLA GRIGLIA' 37
make_card "images/secondi/scaloppine-vino-bianco.webp" "$output_dir/scaloppine-vino-bianco.webp" $'SCALOPPE AL\nVINO BIANCO' 56
make_card "images/secondi/scaloppine-limone.webp" "$output_dir/scaloppine-limone.webp" $'SCALOPPE AL\nLIMONE' 60
make_card "images/secondi/scaloppine-funghi.webp" "$output_dir/scaloppine-funghi.webp" $'SCALOPPE AI\nFUNGHI' 60
make_card "images/secondi/scaloppine-asparagi.webp" "$output_dir/scaloppine-asparagi.webp" $'SCALOPPE AGLI\nASPARAGI' 53
make_card "images/secondi/melanzane-parmigiana.webp" "$output_dir/melanzane-parmigiana.webp" $'MELANZANE ALLA\nPARMIGIANA' 45
make_card "images/secondi/bresaola-rucola-grana.webp" "$output_dir/bresaola-rucola-grana.webp" $'BRESAOLA RUCOLA\nE GRANA' 45
make_card "images/secondi/crudo-melone.webp" "$output_dir/crudo-melone.webp" $'CRUDO E\nMELONE' 64
