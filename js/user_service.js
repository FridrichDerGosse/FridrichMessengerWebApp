function check_passwords_equal() {
    const pw1 = document.getElementById("reg_password");
    const pw2 = document.getElementById("reg_password_confirm");
    const pw1_text = pw1.value;
    const pw2_text = pw2.value;
    if (pw1_text !== pw2_text) {
        pw1.classList.add("input-negative");
        pw2.classList.add("input-negative");
    } else {
        pw1.classList.remove("input-negative");
        pw2.classList.remove("input-negative");
    }
}
