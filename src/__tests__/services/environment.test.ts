describe('environment service tests', () => {
  const getEnvironmentService = () =>
    require('../../services').environmentService

  it('should error if REACT_APP_PREQIN_API_BASE_URL is not defined', () => {
    delete process.env.REACT_APP_PREQIN_API_BASE_URL
    expect(() => {
      getEnvironmentService()
    }).toThrowError()
  })

  it('should return REACT_APP_PREQIN_API_BASE_URL for PREQIN_API_BASE_URL', () => {
    const expected = 'API_KEY_HERE'
    process.env.REACT_APP_PREQIN_API_BASE_URL = expected
    expect(getEnvironmentService().PREQIN_API_BASE_URL).toEqual(expected)
  })
})
