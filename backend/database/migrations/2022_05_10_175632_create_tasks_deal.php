<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksDeal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks_deal', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('type');
            $table->string('description', 1300)->nullable();
            $table->json('files')->nullable();
            $table->string('changed_option')->nullable();
            $table->unsignedBigInteger('changed_from_id')->nullable();
            $table->unsignedBigInteger('changed_to_id')->nullable();
//            $table->foreignId('job_id')->constrained()
//                ->onUpdate('cascade')
//                ->onDelete('cascade');
            $table->foreignId('deal_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('manager_id')->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks_deal');
    }
}
