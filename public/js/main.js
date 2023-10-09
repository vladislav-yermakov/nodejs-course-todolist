document.querySelectorAll('body form.existing_item').forEach(function (form) {
    const itemId = form.querySelector('input[name="id"]').value

    const updateBtn = form.querySelector('button[class="update"]')
    updateBtn.addEventListener("click", function () {
        const title = form.querySelector('input[name="title"]').value
        const description = form.querySelector('input[name="description"]').value
        const isDone = form.querySelector('input[name="isDone"]').checked

        const body = new URLSearchParams({
            itemId: itemId,
            title: title,
            description: description,
            isDone: isDone
        })

        fetch('/item', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        }).then(async response => {
            console.log(response)
            if (response.ok) {
                window.location.replace('/')
            }
        })
    })

    const deleteBtn = form.querySelector('button[class="delete"]')
    deleteBtn.addEventListener("click", function () {
        const body = new URLSearchParams({ itemId: itemId })

        fetch('/item', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        }).then(async response => {
            console.log(response)
            if (response.ok) {
                window.location.replace('/')
            }
        })
    })
})

const logoutBtn = document.querySelector('header button')
logoutBtn.addEventListener('click', function () {
    fetch('/auth/logout', {
        method: 'GET'
    }).then(async response => {
        if (response.ok) {
            window.location.replace('/')
        }
    })
})