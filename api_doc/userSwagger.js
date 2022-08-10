/**
 *  @swagger
 *  /api/user/register:
 *   post:
 *     tags:
 *       - Users
 *     name: register
 *     summary: creates a user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: profile_pic
 *         type: file
 *         in: formData
 *         description: Upload image for profile picture
 *       - name: name
 *         type: string
 *         in: formData
 *         description: User's username
 *       - name: email
 *         type: string
 *         in: formData
 *         description: User's email
 *       - name: password
 *         type: string
 *         in: formData
 *         description: User password
 *         format: password
 *     responses:
 *       201:
 *         description: Created user successfully
 *       401:
 *         description: User with email already exists
 *       400:
 *         description: Bad request, user not created
 */

/**
 * @swagger
 *  /api/user/auth/login:
 *    post:
 *      tags:
 *        - Users
 *      name: user login
 *      summary: logs in a user
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *          required:
 *            - email
 *            - password
 *      responses:
 *        201:
 *          description: successfully logged in
 *        401:
 *          description: credentials don't match
 *        400:
 *          description: user not found
 */

/**
 * @swagger
 *  /api/user/logout:
 *    get:
 *      tags:
 *      - Users
 *    name: Get
 *    summary:  logs out a user
 *    consumes:
 *    responses:
 *      200:
 *        description: logs out a user
 *      500:
 *        description: internal server error
 */
