describe('API Testing', () => {

  let createdCategoryId


  // TC-API-001
  it('List Categories', () => {

    cy.request(
      'GET',
      'https://api.escuelajs.co/api/v1/categories'
    ).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

    })

  })


  // TC-API-002
  it('Get Category by ID', () => {

    cy.request(
      'GET',
      'https://api.escuelajs.co/api/v1/categories/1'
    ).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.eq(1)

    })

  })


  // TC-API-003
  it('Get Category with Invalid ID', () => {

    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/99999',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')

    })

  })


  // TC-API-004
  it('Create New Category', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories',
      body: {
        name: `Manual Testing Category ${Date.now()}`,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.name).to.include('Manual Testing Category')

      createdCategoryId = response.body.id

    })

  })


  // TC-API-005
  it('Create Category without Image', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories',
      body: {
        name: `Category Tanpa Image ${Date.now()}`
      },
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')

    })

  })


  // TC-API-006
  it('Update Category', () => {

    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      body: {
        name: 'Clothes Updated',
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(1)
      expect(response.body.name).to.eq('Clothes Updated')

    })

  })


  // TC-API-007
  it('Update Category with Invalid ID', () => {

    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/99999',
      body: {
        name: 'Category Tidak Ditemukan',
        image: 'https://placehold.co/600x400'
      },
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')

    })

  })


  // TC-API-008
  it('Update Product using PATCH', () => {

    cy.request({
      method: 'PATCH',
      url: 'https://dummyjson.com/products/1',
      body: {
        title: 'Product Updated Using PATCH'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(1)
      expect(response.body.title).to.eq('Product Updated Using PATCH')

    })

  })


  // TC-API-009
  it('Delete Category', () => {

    cy.request({
      method: 'DELETE',
      url: `https://api.escuelajs.co/api/v1/categories/${createdCategoryId}`
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.eq('true')

    })

  })


  // TC-API-010
  it('Verify Deleted Category', () => {

    cy.request({
      method: 'GET',
      url: `https://api.escuelajs.co/api/v1/categories/${createdCategoryId}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message')

    })

  })


  // TC-API-011
  it('Get Category by Slug', () => {

    cy.request(
      'GET',
      'https://api.escuelajs.co/api/v1/categories/slug/shoes'
    ).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.slug).to.eq('shoes')

    })

  })


  // TC-API-012
  it('Get Products by Category', () => {

    cy.request(
      'GET',
      'https://api.escuelajs.co/api/v1/categories/1/products'
    ).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

    })

  })

})