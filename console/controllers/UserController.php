<?php


namespace console\controllers;


use common\models\User;
use Yii;
use yii\console\Controller;

class UserController extends Controller
{
    /**
     * Create user with admin privileges
     */
    public function actionCreateAdmin()
    {
        $model = User::findOne(['username' => 'ruits_admin']);
        if (empty($model)) {
            $user = new User();

            $user->username = 'admin';
            $user->email = Yii::$app->params['adminEmail'];

            $password = readline("password: ");
            $user->setPassword($password);
            $user->generateAuthKey();

            if ($user->save(false)) {
                echo "CREATED USER\n";
            }

            //add role
            $auth = Yii::$app->authManager;
            $role = $auth->getRole(User::ROLE_ADMIN);
            if ($auth->assign($role, $user->getId())) {
                echo "CREATED ROLE\n";
            }
        }
    }
}