
const create_DOMelement =  () => {
    var x = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer");
    console.log('Length is', x.length, ":", x)
  
    if(x.length !== 1){
      console.log('Length is from return', x.length, ":", x)
      return ;
    }
  
    const rootEl = document.createElement('div')
    rootEl.id = 'community_response'
    let insertedNode = x[0].parentNode
    insertedNode.insertBefore(rootEl,x[0])
    console.log("Successfully created DOM Element")
  
  }

  export default create_DOMelement;
