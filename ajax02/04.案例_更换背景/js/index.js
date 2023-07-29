/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */

document.addEventListener('change',e=>{
    let file=e.target.files[0];
    const fd=new FormData();
    fd.append('img',file);
    axios({
        url:'http://hmajax.itheima.net/api/uploadimg',
        method:'POST',
        data:fd
    }).then(res=>{
        const src=res.data.data.url;
        localStorage.setItem('src',src);
    });

    //刷新页面
    location.reload(true);

})
const src = localStorage.getItem('src');
src && (document.body.style.backgroundImage = `url(${src})`)

