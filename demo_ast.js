var tree = {
  statements: [
    {
      type: 'declaration',
      value: {
        type: 'function',
        value: {
          name: 'greet',
          params: ['name'],
          body: [
            {
              concat: {
                left: {
                  type: 'string',
                  value: 'hello '
                },
                right: {
                  type: 'func_param',
                  value: {
                    scope: 'name'
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      type: 'declaration',
      value: {
        name: 'name'
      }
    },
    {
      type: 'assignment',
      value: {
        left: {
          type: 'reference',
          value: {
            scope: 'name'
          }
        },
        right: {
          type: 'string',
          value: 'moshe'
        }
      }
    },
    {
      type: 'declaration',
      value: {
        name: 'greeting'
      }
    },
    {
      type: 'asignment',
      value: {
        left: {
          type: 'reference',
          value: {
            scope: 'greeting'
          }
        },
        right: {
          type: 'call',
          value: {
            func: {
              scope: 'greet'
            },
            params: [
              {
                value: {
                  scope: 'name'
                }
              }
            ]
          }
        }
      }
    }
  ]
};

