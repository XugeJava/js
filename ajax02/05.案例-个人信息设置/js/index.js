/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '播仔'
const form = document.querySelector('form');
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'GET',
    params: {
        creator
    }
}).then(res => {
    console.log(res)
    const obj = res.data.data;
    const keys = Object.keys(obj);
    keys.forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = obj[key];
        } else if (key == 'gender') {
            //获取gender数据
            const check = obj[key];
            const allList = document.querySelectorAll('.gender');
            allList[check].checked = true;
        } else {
            document.querySelector(`.user-form .${key} `).value = obj[key]
        }

    });

})

//修改个人头像
const upload=document.querySelector('input[type=file]');
upload.addEventListener('change',e=>{
    const fd=new FormData();
    fd.append('avatar',e.target.files[0])
    fd.append('creator',creator);
    axios({
        url:'http://hmajax.itheima.net/api/avatar',
        method:'PUT',
        data:fd
    }).then(res=>{
        document.querySelector('.prew').src = res.data.data.avatar;
    })
});

//修改数据
const button=document.querySelector('button');
button.addEventListener('click',e=>{
    const data = serialize(form,{hash:true,empty:true});
    data.creator=creator;
    data.gender=+data.gender;
    axios({
        url:'http://hmajax.itheima.net/api/settings',
        method:'PUT',
        data:data
    }).then(res=>{
        // 4.1 创建toast对象
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)

        // 4.2 调用show方法->显示提示框
        toast.show()

    })


});

