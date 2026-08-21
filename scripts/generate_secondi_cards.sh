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

    # Il tavolo occupa tutta la card, ma resta morbido e sfuma realmente
    # da beige a legno procedendo da sinistra verso destra.
    convert "$source" -resize '1400x^' -crop 1400x650+0+600 +repage \
        -blur 0x10 -modulate 103,84,100 "$work_dir/background.png"
    convert -size 450x650 xc:white \
        \( -size 650x300 gradient:black-white -rotate 90 \) \
        -size 650x650 xc:black +append "$work_dir/beige-mask.png"
    convert -size 1400x650 xc:'#fffaf3' "$work_dir/beige-mask.png" \
        -alpha off -compose CopyOpacity -composite "$work_dir/beige-layer.png"

    # Il piatto viene mantenuto nitido come livello indipendente, ingrandito
    # e posizionato sopra il tavolo sfocato. Il file sorgente resta intatto.
    convert -size 1086x1198 xc:black -fill white \
        -draw 'ellipse 543,755 400,210 0,360' -blur 0x2 "$work_dir/plate-mask.png"
    convert "$source" "$work_dir/plate-mask.png" -alpha off \
        -compose CopyOpacity -composite -trim +repage -resize 820x "$work_dir/plate.png"

    convert "$work_dir/background.png" \
        "$work_dir/beige-layer.png" -compose over -composite \
        "$work_dir/plate.png" -geometry +570+95 -compose over -composite \
        -fill '#123c31' -font "$font" -pointsize "$point_size" -gravity west \
        -annotate +64+0 "$title" \
        -fill '#b5762a' -stroke '#b5762a' -strokewidth 2 -draw 'line 65,430 155,430' \
        -stroke none -draw 'polygon 171,430 177,424 183,430 177,436' \
        -quality 86 "$output"

    rm -rf "$work_dir"
}

make_card "images/secondi/carne-tonnata.webp" "$output_dir/carne-tonnata.webp" $'CARNE\nTONNATA' 68
make_card "images/secondi/cotoletta-alla-milanese.webp" "$output_dir/cotoletta-alla-milanese.webp" $'COTOLETTA ALLA\nMILANESE' 44
make_card "images/secondi/hamburger-manzo-griglia.webp" "$output_dir/hamburger-manzo-griglia.webp" $'HAMBURGER DI MANZO\nALLA GRIGLIA' 34
make_card "images/secondi/scaloppine-vino-bianco.webp" "$output_dir/scaloppine-vino-bianco.webp" $'SCALOPPE AL\nVINO BIANCO' 56
make_card "images/secondi/scaloppine-limone.webp" "$output_dir/scaloppine-limone.webp" $'SCALOPPE AL\nLIMONE' 60
make_card "images/secondi/scaloppine-funghi.webp" "$output_dir/scaloppine-funghi.webp" $'SCALOPPE AI\nFUNGHI' 60
make_card "images/secondi/scaloppine-asparagi.webp" "$output_dir/scaloppine-asparagi.webp" $'SCALOPPE AGLI\nASPARAGI' 53
make_card "images/secondi/melanzane-parmigiana.webp" "$output_dir/melanzane-parmigiana.webp" $'MELANZANE ALLA\nPARMIGIANA' 41
make_card "images/secondi/bresaola-rucola-grana.webp" "$output_dir/bresaola-rucola-grana.webp" $'BRESAOLA RUCOLA\nE GRANA' 41
make_card "images/secondi/crudo-melone.webp" "$output_dir/crudo-melone.webp" $'CRUDO E\nMELONE' 64
