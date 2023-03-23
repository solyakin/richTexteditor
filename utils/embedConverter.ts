export const embedYoutubeVideo = (link : string) =>{
    if (link.indexOf("youtube") >= 0){
        link = link.replace("watch?v=","embed/");
        link = link.replace("/watch/", "/embed/");
        link = link.replace("youtu.be/","youtube.com/embed/");
    }
    return link;
}

export const embedVimeoVideo = (link : string) => {
    if (link.indexOf("vimeo") >= 0){
      const id = link.slice(18);
      link = `https://player.vimeo.com/video/${id}`
      console.log(link)
    }
    return link;
}