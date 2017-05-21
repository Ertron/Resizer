export default function checkFileSize(social_paraps, img_w, img_h){
    let width = img_w;
    let height = img_h;
    function isCorrect(obj) {
        return obj.height < height || obj.width < width;
    }

    for (let i = 0, len = social_paraps.length; i < len; i++) {
        if(social_paraps[i].templates.some(isCorrect)){
            return true;
        }
    }

}