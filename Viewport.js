class Viewport {
    
    constructor() {
        this.elements = []
        this.size = 10
        this.firstIndex = 0
		this.lastScroll = 0
    }

    init() {
        for (let i=0; i<999999; i++) { this.elements.push(i) }
        $vp.on('scroll', (e) => { this.onScroll(e) })
		$vp.find('#viewport').children().each((index, div) => {
			$(div).on('click', () => { console.log(index) })
		})
		this.renderView()
    }

    renderView() {
		let display = this.elements.slice(this.firstIndex, this.firstIndex + this.size)
        $vp.find('#viewport').children().each((index, div) => {
			div.innerHTML = display[index]
		})
		this.scrollOne = $vp.find("#viewport").children()[1].offsetHeight
		this.scrollHeight = this.scrollOne * (this.elements.length)
		$vp.height(this.scrollOne * this.size)
		$vp.find('#scrollBottom').height(this.scrollHeight)
    }

	onScroll(e) {
		let curScroll = $vp.prop('scrollTop')
		$('#debug')[0].innerHTML = `ScrollOne: ${this.scrollOne}<br>ScrollTop: ${curScroll}<br>ScrolHeight: ${$vp.prop('scrollHeight')}`
		this.firstIndex = Math.round(curScroll / this.scrollOne)
		this.renderView()
	}


}

$(function() {
	$vp = $("#numbers")
	viewport = new Viewport()
	viewport.init()
})