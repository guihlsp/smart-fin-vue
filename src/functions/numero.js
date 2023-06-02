export const somenteNumeros = (valor) => {
    return valor.replace(/[^\d]+/g, '')
}

export const formataMoeda = (valor, casas = 2) => {
    if (typeof valor === 'string') {
        valor = valor.replace(/\./g, '').replace(',', '.');
    }
    
    valor = parseFloat(valor);
    
    if (isNaN(valor)) {
        return '';
    }

    return valor.toLocaleString('pt-br', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
        currency: 'BRL'
    });
};



export const removeMoeda = (valor) => {
    if (valor == '' || valor == undefined) {
        return 0
    }
    valor = valor.replaceAll('.', '')
    valor = valor.replace(',', '.')
    return parseFloat(valor)
}

export const formataTelefone = (telefone, validaNumero = true) => {
    if (validaNumero) {
        telefone = telefone.replace(/\D/g, '')
    }
    const tam = telefone.length + 1
    if (tam == 3) {
        telefone = '(' + telefone.substr(0, 3) + ')' + telefone.substr(3, tam)
    }
    if (tam == 7) {
        telefone = '(' + telefone.substr(0, 2) + ')' + telefone.substr(2, 6) + '-' + telefone.substr(6, tam)
    }
    if (tam == 11) {
        telefone = '(' + telefone.substr(0, 2) + ')' + telefone.substr(2, 4) + '-' + telefone.substr(6, tam)
    }
    if (tam == 12) {
        telefone = '(' + telefone.substr(0, 2) + ')' + telefone.substr(2, 5) + '-' + telefone.substr(7, tam)
    }
    return telefone
}

export const formataCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, '')
    const tam = cpf.length + 1
    if (tam > 3 && tam < 7) {
        cpf = cpf.substr(0, 3) + '.' + cpf.substr(3, tam)
    }
    if (tam >= 7 && tam < 10) {
        cpf = cpf.substr(0, 3) + '.' + cpf.substr(3, 3) + '.' + cpf.substr(6, tam - 6)
    }
    if (tam >= 10) {
        cpf = cpf.substr(0, 3) + '.' + cpf.substr(3, 3) + '.' + cpf.substr(6, 3) + '-' + cpf.substr(9, tam - 9)
    }
    return cpf
}

export const formataCnpj = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '')
    const tam = cnpj.length + 1
    if (tam > 2 && tam < 6) {
        cnpj = cnpj.substr(0, 2) + '.' + cnpj.substr(2, tam)
    }
    if (tam >= 6 && tam < 9) {
        cnpj = cnpj.substr(0, 2) + '.' + cnpj.substr(2, 3) + '.' + cnpj.substr(5, tam - 5)
    }
    if (tam >= 9 && tam < 13) {
        cnpj = cnpj.substr(0, 2) + '.' + cnpj.substr(2, 3) + '.' + cnpj.substr(5, 3) + '/' + cnpj.substr(8, tam - 8)
    }
    if (tam >= 13) {
        cnpj = cnpj.substr(0, 2) + '.' + cnpj.substr(2, 3) + '.' + cnpj.substr(5, 3) + '/' + cnpj.substr(8, 4) + '-' + cnpj.substr(12, tam - 12)
    }
    return cnpj
}

export const formataCpfCnpj = (cpfCnpj) => {
    const tam = cpfCnpj.length
    if (tam > 14) {
        return formataCnpj(cpfCnpj)
    } else {
        return formataCpf(cpfCnpj)
    }
}

export const validaCpfCnpj = (cpfCnpj) => {
    if (!cpfCnpj) {
        return true
    }
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '')
    if (cpfCnpj === '') {
        return true
    }
    if (cpfCnpj.length > 11) {
        return validaCnpj(cpfCnpj)
    } else {
        return validaCpf(cpfCnpj)
    }
}

export const validaCpf = (cpf) => {
    if (!cpf) {
        return true
    }
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') {
        return true
    }
    // Elimina CPFs invalidos conhecidos
    if (
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    ) {
        return false
    }
    // Valida 1o digito
    let add = 0
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
        rev = 0
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        return false
    }
    // Valida 2o digito
    add = 0
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i)
    }
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
        rev = 0
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        return false
    }
    return true
}

export const validaCnpj = (cnpj) => {
    if (!cnpj) {
        return true
    }
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj === '') {
        return true
    }
    if (cnpj.length !== 14) {
        return false
    }
    if (
        cnpj === '00000000000000' ||
        cnpj === '111111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999'
    ) {
        return false
    }
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    const digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) {
            pos = 9
        }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(0))) {
        return false
    }
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) {
            pos = 9
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(1))) {
        return false
    }
    return true
}


export const parcelaMinBoleto = (value) => {
    value = value.replaceAll('.', '')
    value = value.replace(',', '.')

    if (parseFloat(value) < 20) {
        return false
    } else {
        return true
    }
}
