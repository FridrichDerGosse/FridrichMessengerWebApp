function send_receive(sock, data, onReceive) {
    sock.send(data); // send a message

    sock.onmessage = (e) => {
        // a message was received
        let out = JSON.parse(e.data).content
        out.done = true
        onReceive(out)
    };

    sock.onerror = (e) => {
        // an error occurred
        console.log(e.message);
        let out = {
            done: true,
            success: false,
            cause: "socketError",
        }
        onReceive(out)
    };
}


function try_login(sock, username, password, onReceive) {
    send_receive(
        sock,
        JSON.stringify({
            time: 1.1,
            data: {
                type: "login",
                username: username,
                password: password
            }
        }),
        onReceive
    )
}


function try_register(sock, username, password, email, onReceive) {
    send_receive(
        sock,
        JSON.stringify({
            time: 1.1,
            data: {
                type: "register",
                username: username,
                password: password,
                email: email,
            }
        }),
        onReceive
    )
}


function get_chats(sock, onReceive) {
    send_receive(
        sock,
        JSON.stringify({
            time: 1.1,
            data: {
                type: "get_chats",
            }
        }),
        onReceive
    )
}


function get_messages(sock, chat_id, onReceive) {
    send_receive(
        sock,
        JSON.stringify({
            time: 1.1,
            data: {
                type: "get_messages",
                chat_id: chat_id,
            }
        }),
        onReceive,
    )
}


function send_message(sock, content, chat_id, onReceive) {
    send_receive(
        sock,
        JSON.stringify({
            time: 1.1,
            data: {
                type: "send_message",
                content: content,
                chat_id: chat_id,
            }
        }),
        onReceive
    )
}

/* */
function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}

function route(page) {
    for (const page_id of ["login_page", "register_page", "chat_page"]) {
        if (page === page_id) {
            document.getElementById(page_id).classList.remove("hidden");
        }
        else {
            document.getElementById(page_id).classList.add("hidden");
        }
    }
    for (const pageElement of document.getElementsByTagName("input")) {
        if (pageElement.type !== "button") {
            pageElement.value = null;
        }

    }
}

async function login() {
    const username_entry = document.getElementById("username");
    const password_entry = document.getElementById("password");
    const error = document.getElementById("login_error");

    const username = username_entry.value;
    const password = await hash(password_entry.value);

    try_login(sock, username, password, (mes) => {
        console.log(mes);
        if (mes["success"]) {
            route("chat_page");
        }
        else {
            error.textContent = mes["details"];
        }
    });
}

async function register_new() {
    const username_entry = document.getElementById("reg_username");
    const password_entry = document.getElementById("reg_password");
    const password_confirm_entry = document.getElementById("reg_password_confirm");
    const email_entry = document.getElementById("reg_email");
    const error = document.getElementById("reg_error")

    const username = username_entry.value;
    const password = password_entry.value;
    const password_confirm = password_confirm_entry.value;
    const email = email_entry.value;

    if (password === password_confirm) {
        const hased_password = await hash(password);

        try_register(sock, username, hased_password, email, (mes) => {
            console.log(mes);
            if (mes["success"]) {
                route("login_page");
            }
            else {
                error.textContent = mes["details"]
            }
        })
    }
    else {
        error.textContent = "Passwords are not matching each other!"
    }
}
