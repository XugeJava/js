/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = 'xuge'
// 封装-获取并渲染图书列表函数
function getBooksList() {
    // 1.1 获取数据
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            // 外号：获取对应数据
            creator
        }
    }).then(result => {
        // console.log(result)
        const bookList = result.data.data
        // console.log(bookList)
        // 1.2 渲染数据
        const htmlStr = bookList.map((item, index) => {
            return `<tr>
            <td>${index + 1}</td>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td data-id=${item.id}>
                <span class="del">删除</span>
                <span class="edit">编辑</span>
            </td>
            </tr>`
        }).join('')
        // console.log(htmlStr)
        document.querySelector('.list').innerHTML = htmlStr
    })
}
// 网页加载运行，获取并渲染列表一次
getBooksList();


const addModalDom = document.querySelector('.add-modal');
const addModal = new bootstrap.Modal(addModalDom)

//绑定保存
document.querySelector('.add-btn').addEventListener('click', () => {
    const form = document.querySelector('.add-form');
    const bookObj = serialize(form, { hash: true, empty: true })
    if (!bookObj.bookname) {
        alert('书名不能为空')
        return;
    }
    //发送请求
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'POST',
        data: {
            ...bookObj,
            creator
        }
    }).then(res => {
        console.log(res);
        //关闭
        addModal.hide();
        //刷新数据
        getBooksList();
        //重置表单
        form.reset();
    })
})


//删除数据
document.querySelector('.list').addEventListener('click', e => {

    //判断点击的是删除元素
    if (e.target.classList.contains('del')) {
        const id = e.target.parentNode.dataset.id
        if (confirm('你确认要删除这本书吗')) {
            axios({
                url: `http://hmajax.itheima.net/api/books/${id}`,
                method: 'DELETE'
            })
                .then(res => {
                    alert(res.data.message);
                    //刷新数据
                    getBooksList();
                })
        }

    }
});
//编辑数据
const editModalDom = document.querySelector('.edit-modal');
const editModal = new bootstrap.Modal(editModalDom);
document.querySelector('.list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.parentNode.dataset.id
        //数据回显
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'GET'
        })
            .then(res => {
                //console.log(res.data.data)
                const book = res.data.data;
                const keys = Object.keys(book);
                keys.forEach(key => {
                    document.querySelector(`.edit-form .${key}`).value = book[key];
                })
            });
        //close
        editModal.show();
    }
})
//保存
document.querySelector('.edit-btn').addEventListener('click', () => {
    //获取表单数据
    const form = document.querySelector('.edit-form');
    const bookObj = serialize(form, { hash: true, empty: true });
    //发送请求
    axios({
        url: `http://hmajax.itheima.net/api/books/${bookObj.id}`,
        method: 'PUT',
        data: bookObj
    }).then(res=>{
        console.log(res)

        //重置表单
        form.reset();
        getBooksList();
        editModal.hide();
    })
});