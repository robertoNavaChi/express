if (typeof links === 'undefined') {
    links = {};
    links.locales = {};
} else if (typeof links.locales === 'undefined') {
    links.locales = {};
}

links.locales['pt'] = {
    'MONTHS': new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"),
    'MONTHS_SHORT': new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"),
    'DAYS': new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"),
    'DAYS_SHORT': new Array("Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"),
    'ZOOM_IN': "Zoom in",
    'ZOOM_OUT': "Zoom out",
    'MOVE_LEFT': "Mover para a esquerda",
    'MOVE_RIGHT': "Mover para a direita",
    'NEW': "Novo",
    'CREATE_NEW_EVENT': "Criar novo evento"
};

links.locales['pt_PT'] = links.locales['pt'];