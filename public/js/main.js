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

profileBtn = document.querySelector('#profile-btn')
if (profileBtn) {
    profileBtn.addEventListener('click', function () {
        window.location.replace('/profile')
    })
}

homeBtn = document.querySelector('#home-btn')
if (homeBtn) {
    homeBtn.addEventListener('click', function () {
        window.location.replace('/')
    })
}

updateProfileBtn = document.querySelector('#update-profile-btn')
if (updateProfileBtn) {
    updateProfileBtn.addEventListener('click', function () {
        const root = document.querySelector('body main')
        const birthdate = root.querySelector('input[name="birthdate"]').value
        const address = root.querySelector('input[name="address"]').value
        const info = root.querySelector('#finfo').value

        const body = new URLSearchParams({
            birthdate: birthdate,
            address: address,
            info: info
        })

        fetch('/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        }).then(async response => {
            if (response.ok) {
                window.location.reload()
            }
        })
    })
}

logoutBtn = document.querySelector('#logout-btn')
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        fetch('/auth/logout', {
            method: 'GET'
        }).then(async response => {
            if (response.ok) {
                window.location.replace('/')
            }
        })
    })
}