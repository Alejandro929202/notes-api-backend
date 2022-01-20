const { palindrome } = require('../utils/for_testing')

test('palindrome of alejandro', () =>{
    const result = palindrome('alejandro')

    expect(result).toBe('ordnajela')
})

test('palindrome of empty string', () =>{
    const result = palindrome('')

    expect(result).toBe('')
})

test('palindrome of undefined', () =>{
    const result = palindrome()

    expect(result).toBeUndefined()
})