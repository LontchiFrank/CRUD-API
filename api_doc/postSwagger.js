/**
 * @swagger
 * /api/post/new:
 *  post:
 *    tags:
 *      - Category
 *    name: create
 *    summary: create category
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: image
 *        type: file
 *        in: formData
 *        description: Upload image
 *      - name: name
 *        type: string
 *        in: formData
 *        description: category name
 *      - name: description
 *        type: string
 *        in: formData
 *        description: category description
 *    responses:
 *      201:
 *        description: category created
 *      500:
 *        description: internal server error
 *      422:
 *        description: validation error
 */

/**
 * @swagger
 * /api/post:
 *  get:
 *    tags:
 *      - Category
 *    name: Get
 *    summary: get all categories
 *    consumes:
 *    responses:
 *      200:
 *        description: got all categories
 *      500:
 *        description: internal server error
 */

/**
 * @swagger
 * /api/post/update/:id:
 *  put:
 *    tags:
 *      - Category
 *    name: Update
 *    summary: Update Category
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: id
 *        in: path
 *        require: true
 *        type: string
 *      - name: image
 *        type: file
 *        in: formData
 *        description: Upload category image
 *      - name: name
 *        type: string
 *        in: formData
 *        description: category name
 *      - name: description
 *        type: string
 *        in: formData
 *        description: category description
 *    responses:
 *      201:
 *        description: updated category
 *      500:
 *        description: internal server error
 */

/**
 * @swagger
 * /api/post//delete/:id:
 *  delete:
 *    tags:
 *      - Category
 *    name: Delete
 *    summary: Delete Category
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        type: string
 *        example: Bearer token-string
 *      - name: id
 *        in: path
 *        require: true
 *        type: string
 *    responses:
 *      201:
 *        description: deleted category
 */
