export default function calculateSizes(soc_w, soc_h, img_w, img_h){
    const soc_ration = soc_w / soc_h;
    const img_ration = img_w / img_h;
    let img_width = img_w;
    let img_height = img_h;
    let indent_left = 0;
    let indent_top = 0;

    if(soc_ration === 1){
        console.log(' soc ration == 1');
        if(img_ration > 1){
            console.log(' img_ration > 1');
            img_height = soc_h;
            img_width = img_height * img_ration;
        }
        else if(img_ration < 1){
            console.log(' img_ration < 1');
            img_width = soc_w;
            img_height = img_width / img_ration;
        }
        else if(img_ration === 1){
            console.log(' img_ration === 1');
            img_height = soc_h;
            img_width = soc_w;
        }
    }
    else if(soc_ration > img_ration){
        console.log('soc_ration > img_ration');
        img_width = soc_w;
        img_height = img_width / img_ration;
    }
    else if(soc_ration < img_ration){
        console.log(' soc_ration < img_ration ');
        img_height = soc_h;
        img_width = img_height * img_ration;
    }
    if(img_width > soc_w){
        indent_left = (img_width - soc_w) / 2;
    }
    else if(img_height > soc_h){
        indent_top = (img_height - soc_h) / 2;
    }
    
    return {
        width: Math.round(img_width),
        height: Math.round(img_height),
        indent_left: Math.round(indent_left),
        indent_top: Math.round(indent_top)
    }
}