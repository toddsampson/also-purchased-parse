import { shallowMount } from '@vue/test-utils'
import ParseBooks from '@/components/ParseBooks.vue'


describe('ParseBooks.vue', () => {
  // INPUT CLEANUP
  it('renders props.msg when passed', () => {
    const msg = 'testing jest'
    const wrapper = shallowMount(ParseBooks)
    expect(wrapper.vm.msg = msg).toMatch(msg)
  })
  it('converts msg newlines into output array', () => {
    const msg = 'line 1\nline 2'
    const wrapper = shallowMount(ParseBooks)
    wrapper.vm.msg = msg
    expect(Array.isArray(wrapper.vm.output)).toBe(true)
    expect(wrapper.vm.output).toHaveLength(2)
  })
  it('should remove customers also bought text', () => {
    const msg = 'Customers who bought related items also bought\nline 2'
    const wrapper = shallowMount(ParseBooks)
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Customers who bought related items also bought')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove customers also viewed text', () => {
    const msg = 'Customers who viewed this item also viewed\nline 2'
    const wrapper = shallowMount(ParseBooks)
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Customers who viewed this item also viewed')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('shoud remove page numbers', () => {
    const wrapper = shallowMount(ParseBooks)
    let msg = 'Page 1 of 6\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Page 1 of 6')
    expect(wrapper.vm.output).toContain('line 2')

    msg = 'Page 1 of 6 Page 1 of 6\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Page 1 of 6 Page 1 of 6')
    expect(wrapper.vm.output).toContain('line 2')

    msg = 'Page 3 of 9\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Page 3 of 9')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove naviation messages', () => {
    const wrapper = shallowMount(ParseBooks)
    let msg = 'This shopping feature will continue to load items. In order to navigate out of this carousel please use your heading shortcut key to navigate to the next or previous heading.\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('This shopping feature will continue to load items. In order to navigate out of this carousel please use your heading shortcut key to navigate to the next or previous heading.')
    expect(wrapper.vm.output).toContain('line 2')

    msg = 'Back\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Back')
    expect(wrapper.vm.output).toContain('line 2')

    msg = 'Next\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Next')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove book ratings and stars', () => {
    const wrapper = shallowMount(ParseBooks)
    let msg = '4.7 out of 5 stars 200\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('4.7 out of 5 stars 200')
    expect(wrapper.vm.output).toContain('line 2')

    msg = '4.1 out of 5 stars 137\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('4.1 out of 5 stars 137')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove Kindle Edition', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'Kindle Edition\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('Kindle Edition')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove prices', () => {
    const wrapper = shallowMount(ParseBooks)
    let msg = '$2.99\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('$2.99')
    expect(wrapper.vm.output).toContain('line 2')

    msg = '$3.95\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('$3.95')
    expect(wrapper.vm.output).toContain('line 2')

    msg = '$0.99\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('$0.99')
    expect(wrapper.vm.output).toContain('line 2')

    msg = '$.99\nline 2'
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('$.99')
    expect(wrapper.vm.output).toContain('line 2')
  })
  it('should remove #1 best seller messages', () => {
    const msg = 'Property: A Dark Billionaire Romance\nProperty: A Dark Billionaire Romance\nLoki Renard\n4.6 out of 5 stars 96\n#1 Best Seller in Gothic Romance\nKindle Edition\n$3.95\n'
    const wrapper = shallowMount(ParseBooks)
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('#1 Best Seller in Gothic Romance')

  })
  it('should remove empty array elements', () => {
    const msg = 'line 1\nline 2\nline 3\n\n'
    const wrapper = shallowMount(ParseBooks)
    wrapper.vm.msg = msg
    expect(wrapper.vm.output).not.toContain('')
    expect(wrapper.vm.output).toContain('line 1')
    expect(wrapper.vm.output).toHaveLength(3)
  })

  // AUTHOR LIST
  it('should split out deduped author list', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'book 1\nbook 1\nauthor 1\nbook 2\nbook 2\nauthor 2\nbook 3\nbook 3\nauthor 1'
    wrapper.vm.msg = msg
    expect(wrapper.vm.authors).not.toContain('book 1')
    expect(wrapper.vm.authors).toContain('author 1')
    expect(wrapper.vm.authors).not.toContain('book 2')
    expect(wrapper.vm.authors).toContain('author 2')
    expect(wrapper.vm.authors).not.toContain('book 3')
    expect(wrapper.vm.authors).not.toContain('author 3')
    expect(wrapper.vm.authors).toHaveLength(2)
  })
  it('should sort author list by name', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'book 2\nbook 2\nauthor 2\nbook 1\nbook 1\nauthor 1\nbook 3\nbook 3\nauthor 3'
    wrapper.vm.msg = msg
    expect(wrapper.vm.authors[0]).toContain('author 1')
    expect(wrapper.vm.authors[0]).not.toContain('author 2')
    expect(wrapper.vm.authors[1]).toContain('author 2')
    expect(wrapper.vm.authors[2]).toContain('author 3')
    expect(wrapper.vm.authors).toHaveLength(3)
  })

  // BOOK LIST
  it('should split out deduped book list', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'book 1\nbook 1\nauthor 1\nbook 2\nbook 2\nauthor 2\nbook 3\nbook 3\nauthor 1'
    wrapper.vm.msg = msg
    expect(wrapper.vm.books).toContain('book 1')
    expect(wrapper.vm.books).not.toContain('author 1')
    expect(wrapper.vm.books).toContain('book 2')
    expect(wrapper.vm.books).not.toContain('author 2')
    expect(wrapper.vm.books).toContain('book 3')
    expect(wrapper.vm.books).not.toContain('author 3')
    expect(wrapper.vm.books).toHaveLength(3)
  })
  it('should remove series information from book titles', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'Captive of the Horde King (Horde Kings of Dakkar Book 1)\nCaptive of the Horde King (Horde Kings of Dakkar Book 1)\nZoey Draven\nGorison Traveler Incident (Veslor Mates Book 1)\nGorison Traveler Incident (Veslor Mates Book 1)\nLaurann Dohner\nCommander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)\nCommander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)\nDiana Logan'
    wrapper.vm.msg = msg
    expect(wrapper.vm.books).toContain('Captive of the Horde King')
    expect(wrapper.vm.books).not.toContain('Captive of the Horde King (Horde Kings of Dakkar Book 1)')
    expect(wrapper.vm.books).not.toContain('Zoey Draven')
    expect(wrapper.vm.books).toContain('Gorison Traveler Incident')
    expect(wrapper.vm.books).not.toContain('Gorison Traveler Incident (Veslor Mates Book 1)')
    expect(wrapper.vm.books).not.toContain('Laurann Dohner')
    expect(wrapper.vm.books).toContain('Commander\'s Trade')
    expect(wrapper.vm.books).not.toContain('Commander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)')
    expect(wrapper.vm.books).not.toContain('Diana Logan')
    expect(wrapper.vm.books).toHaveLength(3)
  })
  it('should remove A and The from the start of book titles', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'The Gorison Traveler Incident\nThe Gorison Traveler Incident\nLaurann Dohner\nA Commander\'s Trade\nA Commander\'s Trade\nDiana Logan'
    wrapper.vm.msg = msg
    expect(wrapper.vm.books).toContain('Gorison Traveler Incident')
    expect(wrapper.vm.books).not.toContain('The Gorison Traveler Incident')
    expect(wrapper.vm.books).not.toContain('Laurann Dohner')
    expect(wrapper.vm.books).toContain('Commander\'s Trade')
    expect(wrapper.vm.books).not.toContain('A Commander\'s Trade')
    expect(wrapper.vm.books).not.toContain('Diana Logan')
    expect(wrapper.vm.books).toHaveLength(2)
  })
  it('should sort book list by title', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'book 2\nbook 2\nauthor 2\nbook 1\nbook 1\nauthor 1\nbook 3\nbook 3\nauthor 3'
    wrapper.vm.msg = msg
    expect(wrapper.vm.books[0]).toContain('book 1')
    expect(wrapper.vm.books[0]).not.toContain('book 2')
    expect(wrapper.vm.books[1]).toContain('book 2')
    expect(wrapper.vm.books[2]).toContain('book 3')
    expect(wrapper.vm.books).toHaveLength(3)
  })


  // SERIES LIST
  it('should split out deduped series list', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'Captive of the Horde King (Horde Kings of Dakkar Book 1)\nCaptive of the Horde King (Horde Kings of Dakkar Book 1)\nZoey Draven\nGorison Traveler Incident (Veslor Mates Book 1)\nGorison Traveler Incident (Veslor Mates Book 1)\nLaurann Dohner\nCommander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)\nCommander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)\nDiana Logan'
    wrapper.vm.msg = msg
    expect(wrapper.vm.series).toContain('Horde Kings of Dakkar')
    expect(wrapper.vm.series).not.toContain('Captive of the Horde King (Horde Kings of Dakkar Book 1)')
    expect(wrapper.vm.series).not.toContain('Zoey Draven')
    expect(wrapper.vm.series).toContain('Veslor Mates')
    expect(wrapper.vm.series).not.toContain('Gorison Traveler Incident (Veslor Mates Book 1)')
    expect(wrapper.vm.series).not.toContain('Laurann Dohner')
    expect(wrapper.vm.series).toContain('Commanders of the Iti')
    expect(wrapper.vm.series).not.toContain('Commander\'s Trade: A SciFi Alien Romance (Commanders of the Iti Book 2)')
    expect(wrapper.vm.series).not.toContain('Diana Logan')
    expect(wrapper.vm.series).toHaveLength(3)
  })
  it('should remove A and The from the start of series list', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'The Captive of the Horde King (The Horde Kings of Dakkar Book 1)\nThe Captive of the Horde King (The Horde Kings of Dakkar Book 1)\nZoey Draven\nA Gorison Traveler Incident (A Veslor Mates Book 1)\nA Gorison Traveler Incident (A Veslor Mates Book 1)\nLaurann Dohner'
    wrapper.vm.msg = msg
    expect(wrapper.vm.series).toContain('Horde Kings of Dakkar')
    expect(wrapper.vm.series).not.toContain('The Captive of the Horde King (Horde Kings of Dakkar Book 1)')
    expect(wrapper.vm.series).not.toContain('Zoey Draven')
    expect(wrapper.vm.series).toContain('Veslor Mates')
    expect(wrapper.vm.series).not.toContain('A Gorison Traveler Incident (Veslor Mates Book 1)')
    expect(wrapper.vm.series).not.toContain('Laurann Dohner')
  })
  it('should sort series list by series title', () => {
    const wrapper = shallowMount(ParseBooks)
    const msg = 'book 2 (series 2 book 1)\nbook 2 (series 2 book 1)\nauthor 2\nbook 1 (series 1 book 1)\nbook 1 (series 1 book 1)\nauthor 1\nbook 3 (series 3 book 1)\nbook 3 (series 3 book 1)\nauthor 3'
    wrapper.vm.msg = msg
    expect(wrapper.vm.series[0]).toContain('series 1')
    expect(wrapper.vm.series[0]).not.toContain('series 2')
    expect(wrapper.vm.series[1]).toContain('series 2')
    expect(wrapper.vm.series[2]).toContain('series 3')
    expect(wrapper.vm.series).toHaveLength(3)
  })

})

// TODO:
// Next phase is to actually put this into a database w/ book # where we track frequency of the items showing up, break out new ones, etc.
// Include twaked version of author/book/title more likely to be found in a search (remove :, ., ', etc.)
// Match partial titles and series names in db
// mark ones that are too generic to use for advertising
// Use this to drive reviews for new authors
// Recommend (or set -- advertising API??) if it should be exact match or partial match targeting? -- LIKELY USE IF IT HAS A : OR single quote in the string (also starting with A or The)
// Capture phrases after the : for marketing use
