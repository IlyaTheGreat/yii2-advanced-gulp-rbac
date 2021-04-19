<?php


namespace console\controllers;

use Exception;
use Yii;
use yii\console\Controller;
use yii\console\ExitCode;

class RbacController extends Controller
{
    /**
     * @return int ExitCode
     * @throws Exception
     */
    public function actionInit(): int
    {
        $authManager = \Yii::$app->authManager;

        // Create roles
        $user    = $authManager->createRole('user');
        $manager = $authManager->createRole('premium');
        $admin   = $authManager->createRole('admin');

        try {
            $authManager->add($user);
            $authManager->add($manager);
            $authManager->add($admin);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return ExitCode::OK;
    }
}