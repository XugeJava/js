/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
//1.设置省份下拉菜单数据
axios({
    url: 'http://hmajax.itheima.net/api/province',
    method: 'GET'
}).then(res => {
    const str = res.data.list.map(item => {
        return `
    <option value="${item}">${item}</option>
    `
    }).join('')
    document.querySelector('.province').innerHTML = ' <option value="">省份</option>' + str
})
let pname='';
//2.切换省份，设置城市下拉菜单数据，清空地区下拉菜单数据
document.querySelector('.province').addEventListener('change', async e => {
    pname=e.target.value;
    console.log(e.target.value)//省份
    const res = await axios({ url: 'http://hmajax.itheima.net/api/city', params: { pname: e.target.value } });
    const str = res.data.list.map(item => {
        return `
        <option value="${item}">${item}</option>
        `
    }).join('');
    document.querySelector('.city').innerHTML = '<option value="">城市</option>'+str;


    // 清空地区数据
    document.querySelector('.area').innerHTML = `<option value="">地区</option>`

})
//3.切换城市，设置地区数据
document.querySelector('.city').addEventListener('change',async e=>{
    const obj={
        cname:e.target.value,
        pname:pname
    }
    console.log(obj);
    const res = await axios({ url:'http://hmajax.itheima.net/api/area',params:obj});
    const str=res.data.list.map(item=>{
    return `
    <option value="${item}">${item}</option>
    
    `
    }).join('');
    document.querySelector('.area').innerHTML = '<option value="">地区</option>'+str;
})

/**
 * 目标2：收集数据提交保存
 *  2.1 监听提交的点击事件
 *  2.2 依靠插件收集表单数据
 *  2.3 基于axios提交保存，显示结果
 */
document.querySelector('button').addEventListener('click',e=>{
    const form=document.querySelector('.info-form');
    const data=serialize(form,{hash:true,empty:true})
    console.log(data)
    axios({
        url:'http://hmajax.itheima.net/api/feedback',
        method:'POST',
        data:data
    }).then(res=>{
        alert(res.data.message)
    }).catch(err=>{

    });
})
