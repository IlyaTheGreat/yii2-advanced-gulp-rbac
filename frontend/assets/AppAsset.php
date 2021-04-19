<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];

    public function init()
    {
        if (YII_ENV_DEV) {
            $this->css[] = 'styles/css/main.css';
        }
        else if(!YII_ENV_DEV) {
            $this->css[] = 'styles/css-min/main.min.css';
        }

        $this->js = ['js'];

        parent::init();
    }
}
