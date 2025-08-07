export default function renderSelectElements(buttons) {
    let _html = '';

    for(var i = buttons.length; i--;) {
        let x = buttons[i];

        if (x.type === 'select') {
            _html += `
                <div class="asw-select-wrapper">
                    <div class="asw-select-label">
                        ${ x.icon }<span class="asw-translate" data-translate="Dyslexia Font">${ x.label }</span>
                    </div>
                    <select class="asw-select" data-key="${ x.key }" title="${ x.label }">
                        ${x.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>
                </div>
            `;
        }
    }
    
    return _html;
}