<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->char('client_name', 150);
            $table->string('mobile', 50);
            $table->string('add_mobile', 50)->nullable();
            $table->string('email', 50);
            $table->string('ySell', 150)->nullable();
            $table->integer('adviser_id')->nullable();
            $table->integer('manager_id')->nullable();
            $table->integer('work_status_id')->nullable();
            $table->integer('fb_status_id')->nullable();
            $table->integer('ref_option_id')->nullable();
            $table->integer('delivery_id')->nullable();
            $table->string('fb_link', 150)->nullable();
            $table->string('tg_link', 150)->nullable();
            $table->string('vb_link', 150)->nullable();
            $table->string('profile_avatar', 150)->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_profiles');
    }
}
