$(function(){
    setSelect()
    selectNav()
    initToc()
    search()
})
function initToc() {
    $('#toc').initTOC({
        selector: 'h1,h2,h3,h4,h5',
        scope: '#template',
        overwrite: false,
        prefix: 'toc'
    });
    $('#toc').find('ol').addClass('section-nav')
    $('#toc').find('ol li').addClass('toc-entry')
}
function search(){
    let search=$('#search-input')
    let searchList= $('.result')
    let down=$('.searchResult')
    let cot=$('#toc').find('ol').html()
    search.keyup(function(){
        let key=search.val().split('')
        let re=/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g
        let tit=cot.match(re)
        let arr=[]
        let obj={}
        searchList.html('')
        for(var i=0;i<tit.length;i++){
            var font=$(tit[i]).text()
            //var str=font.split('')
            for(var j=0;j<key.length;j++){
               // var posarr = findAll(str, key[j]);
                if(font.search(key[j])!=-1){
                        arr.push(tit[i])
                }
            }
        }
        if(arr.length){
            for(let i of arr){
                if(!obj[i]){

                    searchList.append(i)
                    obj[i]=1
                }
            }
        }else{
            let op='<p>抱歉没有找到包含'+search.val()+'的结果</p >'
            searchList.html(op)
        }
        if(search.val()==''){
            down.hide()
        }else{
            down.show()
        }
    })
  $(document).click(function (e) {
      if(e.target.nodeName=='A'&&e.target.parentNode.className=='result'){
          down.hide()
          search.val('')
      }
      down.hide()
  })
        function findAll(arr, str) {
        var results = [],
            len = arr.length,
            pos = 0;
        while (pos < len) {
            pos = arr.indexOf(str, pos);
            if (pos === -1) {
                break;
            }
            results.push(pos);
            pos++;
        }
        return results;
    }

}
function getDoc(keywords) {
    let baseUrl= location.host+'/smart-doc'
    let params={
        pageSize:10,
        pageNum:1,
        keywords:keywords
    }

    $.ajax({
        type: "POST",
        url: baseUrl+"/docContent/query",
        dataType: 'json',
        data:JSON.stringify(params) ,
        contentType: "application/json;charset=utf-8",
        success: function(msg){
            alert( "Data Saved: " + msg );
        }
    });
}
function setSelect() {
    let id=$('#content').attr('data-id')
    let el=$('#bd-docs-nav').find('.docContent')
    el.each(function(i,item){
        if($(item).attr('data-id')===id){
            $(this).addClass('active')
            $(this).parents('div.collapse').addClass('show').prev().removeClass('collapsed')
        }
    })
}
function selectNav(){
    let el=$('#bd-docs-nav').find('.docContent')
    el.click(function(){
        let that=$(this)
        let id=that.attr('data-id')
        $.cookie('docId',id)
    })
}
