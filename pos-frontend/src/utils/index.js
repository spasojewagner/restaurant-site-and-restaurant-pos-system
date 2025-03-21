export const getBgColor = () => {
    const bgarr = [ "#5b45b8", "#76167f", "#735732", "#142559", "#285438"];
    const randomfg = Math.floor(Math.random() * bgarr.length);
    const color = bgarr[randomfg];
    return color;
}
export const getAvatarName= (name)=>{
    if(!name) return"";
    return name.split(" ").map(word=>word[0]).join("").toUpperCase();
}


    export const formatDateAndTime = (date) => {
    const dateAndTime = new Date(date).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Europe/Berlin"
    });
    return dateAndTime;
};
