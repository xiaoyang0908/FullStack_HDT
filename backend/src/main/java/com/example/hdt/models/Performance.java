package com.example.hdt.models;

import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

public class Performance implements Serializable {
        @Field("left")
        private float left;
        @Field("right")
        private float right;

        public float getLeft() {
            return left;
        }

        public void setLeft(float left) {
            this.left = left;
        }

        public float getRight() {
            return right;
        }

        public void setRight(float right) {
            this.right = right;
        }
}
