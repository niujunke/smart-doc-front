$(function(){
    selectNav()
})
function selectNav(){
    let elLi=$('#bd-docs-nav').find('ul>li')
    elLi.click(function(){
        let that=$(this)
        that.parents('#bd-docs-nav').find('li').removeClass('active').parent().siblings().removeClass('active')
        that.addClass('active').siblings().removeClass('active').parent().siblings().addClass('active')
    })
}
